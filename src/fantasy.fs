module fantasy.Exports

open System
open Fable.Core
open Fable.Core.JsInterop
open Fable.JS.Interfaces
open Fable.PowerPack
open Fable.Import

open Yargs

[<Emit("__dirname")>]
let __dirname = jsNative

type IPath =
    abstract join: string * string -> string
    abstract basename: string -> string
    abstract dirname: string -> string
    abstract relative: string * string -> string
    abstract resolve: string -> string
    [<Emit("$0.join(__dirname, $1)")>]
    abstract resolveWithFile: string -> string

let path: IPath = importAll "path"

let inline (</>) path1 path2 = path.join(path1,path2)

type IFileSystem =
    abstract readFileSync: string -> byte[]
    [<Emit("$0.readFileSync($1,'utf8')")>]
    abstract readTextSync: string -> string
    abstract writeFileSync: string * obj -> unit
    abstract mkdirSync: string -> unit

let fs: IFileSystem = importAll "fs"

type Imkdirp =
    abstract sync : string -> unit

let mkdirp : Imkdirp = importAll "mkdirp"


[<Fable.Core.Emit("process.hrtime()")>]
let hrTimeNow(): float[] = failwith "JS only"

[<Fable.Core.Emit("process.hrtime($0)")>]
let hrTimeElapsed(time: float[]): float[] = failwith "JS only"

let measureTime (f: 'a -> 'b) x =
    let startTime = hrTimeNow()
    let res = f x
    let elapsed = hrTimeElapsed(startTime)
    int64 (elapsed.[0] * 1e3 + elapsed.[1] / 1e6), res
   
let measureTimePromise (f: 'a -> JS.Promise<'b>) x = promise {
    let startTime = hrTimeNow()
    let! res = f x
    let elapsed = hrTimeElapsed(startTime)
    return int64 (elapsed.[0] * 1e3 + elapsed.[1] / 1e6), res
}


let FableREPL: IFableManager = importDefault "../lib/fable-repl/Main.js"
let runAst(jsonAst: string): string  = importMember "./util.js"


let use_net45_meta = false
let references = Metadata.references use_net45_meta
let metadataPath =
    if use_net45_meta
    then "metadata/"  // dotnet 4.5 binaries
    else "metadata2/" // dotnet core 2.0 binaries

let readAllBytes = fun (fileName:string) -> fs.readFileSync (__dirname </> metadataPath </> fileName)

let getChecker = lazy (
    FableREPL.CreateChecker(references, readAllBytes)
)


let [<Literal>] FILE_NAME = "test.fs"

let compiler (content : string) =
    printfn "%s" "Getting Checker..."
    let ms0, fcsChecker = measureTime (fun () -> getChecker.Force() ) ()
    printfn "Getting Checker took %d ms" ms0

    printfn "%s" "Parsing Project..."
    let ms1, res = measureTime (fun () -> FableREPL.ParseFSharpProject(fcsChecker, FILE_NAME, content)) ()
    printfn "Parsing Project took %d ms" ms1

    printfn "%s" "Loading compiler..."
    let ms2, com = measureTime (fun () -> FableREPL.CreateCompiler("./fable-core")) ()
    printfn "Loading compiler took %d ms" ms2
    
    printfn "%s" "Compiling To Babel Json Ast..."
    let ms3, jsonAst = measureTime (fun () -> FableREPL.CompileToBabelJsonAst(com, res, FILE_NAME)) ()
    printfn "Compiling To Babel Json Ast took %d ms" ms3

    printfn "Compiling to codeES2015"
    let ms4, (codeES2015) = measureTime (fun () -> runAst jsonAst) ()
    printfn "Compiling to codeES2015 took %d ms" ms4
    
    codeES2015


let readAllText (filePath:string) =
    fs.readTextSync(filePath)



[<EntryPointAttribute>]
let main argv =
    let args =  argv |> ResizeArray<_> |>  U2.Case2 |> yargs.parse
    let outputDir =  args.["o"].Value :?> string
    let file =  args.["f"].Value :?> string
    let sourceFileName = path.resolve file //|> //normalize
    let source = readAllText sourceFileName

    let outfile = outputDir </> file.Replace("fsx", "js") 
    // let targetFileName = path.resolve argv.[1] |> normalize
    compiler source
    |> fun (codeES2015) ->
        printfn "---codeES2015---"
        outfile |> path.dirname |> mkdirp.sync
        fs.writeFileSync(outfile,codeES2015)    
    0