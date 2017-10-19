`nops-csv` is a command line tool that coordinates to downloading and processing
of downloads with [PkgDecrypt](https://github.com/weaknespase/PkgDecrypt/).

Using `nops-csv` you can easily download and process multiple files. The tool is
conscientious about recording success and failure.

This tool is [built on `nops`](https://www.npmjs.com/package/nops). Give that
tool a try if you want painless download and processing of one file at a time.

## Installation

1. Install the [PkgDecrypt](https://github.com/weaknespase/PkgDecrypt/)
application globally. The `pkc_dec` executable _must_ be found in your
system's `$PATH`.
2. Node.js version greater than 8.6.0 is required.
3. After Node.js is installed, use npm to install `nops-csv`:

```
$ npm install -g nops-csv
```

## Usage

```
$ nops-csv -h
Usage: nops-csv [options] [flags]

Options:
  --input, -i   A file containing comma separated url and license values
              [string] [required] [default: "nops.csv" in the current directory]
  --output, -o  The directory where PKG contents are extracted
                                [string] [required] [default: current directory]
  --temp, -t    The directory where PKG files are temporarily stored
                                [string] [required] [default: current directory]

Flags:
  --colorize, -c  Enable colored output                [boolean] [default: true]
  --dirty, -d     Disable deletion of downloaded PKG after successful processing
                                                      [boolean] [default: false]
  --next, -n      Disable automatically proceeding to the next line in input CSV
                                                       [boolean] [default: true]
  --verbose, -v   Enable verbose output to stdout and stderr
                                                      [boolean] [default: false]

General:
  --help, -h  Show help                                                [boolean]
  --version   Show version number                                      [boolean]
```

### CSV input file

By default `nops-csv` will look for a `nops.csv` file in the same directory that
the tool was run in. The file should contain one URL and license on each line.
There should be no title row in the CSV file. Example:

```
$ cat ./nops.csv
url0,license0
url1,license1
urlN,licenseN
```

You can use the `--input` parameter to specify another CSV file.

### Downloading / processing downloads

Files are first downloaded to the directory specified by the `--temp` parameter.
Once the download is complete the download is processed. The processed files are
saved to the directory specified by the `--output` parameter. For simplicity,
each of these parameters defaults to the directory which the `nops-csv` tool was
run.

Typically downloaded files are deleted once processed. You can pass the
`--dirty` flag to skip deleting the downloaded files. This is particularly
handy when avoiding repeat downloads during development or to keep an archive of
the downloaded files.

#### Example:

Process the `queue.csv` stored in my home directory. Save downloads to the
`/Downloads` directory in my home directory. Output the files to a directory on
another volume. Keep the downloaded files.

Be careful specifying the output directory to your PS Vita SD card. Best to
verify the processing then copy manually.

```
$ nops-csv --input ~/queue.csv --temp ~/Downloads --output /Volumes/USB --dirty
```

### Queue processing

The `nops-csv` tool reads and writes to the CSV input file. Each time you run
the tool you're starting a "session". Each session is identified by the tool's
output. See `count-boy` in the example below:

```
$ nops-csv
Session starting: count-boy
...
Session complete: count-boy
```

When a processing completes on a file the tool will check if the first line of
the queue still matches the expected value. If it does the value will be
removed. You can add/remove lines from the queue during a session. Removing the
first line while a session is active will not stop the download and processing
of that line.

The tool then create and updates one of two new CSV files. After successful
download and processing the `{session}-complete.csv` file is updated. Whereas
after failure the `{session}-failed.csv` file is updated. The `{session}` token
in the CSV files names is replaced by the name of the session, ex:
`count-boy-complete.csv`.

You can then easily retry failed downloads:

```
$ nops-csv -i count-boy-failed.csv
```

## Upgrading

From a terminal window use a JavaScript package manager to upgrade the
application. For example, using npm:

```
$ npm upgrade nops-csv -g
```

## Removal

From a terminal window use a JavaScript package manager to remove the
application. For example, using npm:

```
$ npm uninstall nops-csv -g
```

## Found a bug?

* Re-run `nops-csv` with the `--verbose` flag.
* Examine the output closely. If the error occurs during extraction and
decryption please try to reproduce the error by running the full `pkg_dec ...`
command on its own.
  * If the error is reproducible then please visit the
  [PkgDecrypt](https://github.com/weaknespase/PkgDecrypt/) repo.
  * If the error is _not_ reproducible please file an issue in this repo.
  Understand that this is free software and YMMV.

## I'm still having trouble?

* Did `nops-csv` and PkgDecrypt complete without an issue but you're still
having trouble? If so please start with visiting relevant subreddits or Discord
chats. This application is simply a front-end.

## Changelog

### 1.0.2

* Bumped the `nops` dependency version to 1.1.0.
* Always log error text from PkgDecrypt.

### 1.0.1

* Corrected improper shebang and lack of executable permission.

### 1.0.0

* Initial release.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Thanks!

* Most of all, thank you to the PkgDecrypt authors for your work and help!
