Package: poppler[core,font-configuration,zlib]:x64-windows@25.7.0

**Host Environment**

- Host: x64-windows
- Compiler: MSVC 19.50.35727.0
- CMake Version: 4.3.0
-    vcpkg-tool version: 2026-03-04-4b3e4c276b5b87a649e66341e11553e8c577459c
    vcpkg-scripts version: c27eeddba7 2026-03-25 (6 days ago)

**To Reproduce**

`vcpkg install `

**Failure logs**

```
Downloading https://gitlab.freedesktop.org/poppler/poppler/-/archive/poppler-25.07.0/poppler-poppler-25.07.0.tar.gz -> poppler-poppler-poppler-25.07.0.tar.gz
Attempt 1 of 3, retrying download.
Attempt 2 of 3, retrying download.
error: Download timed out.
error: Download timed out.
error: Reached maximum number of attempts, won't retry download from https://gitlab.freedesktop.org/poppler/poppler/-/archive/poppler-25.07.0/poppler-poppler-25.07.0.tar.gz.
CMake Error at scripts/cmake/vcpkg_download_distfile.cmake:136 (message):
  Download failed, halting portfile.
Call Stack (most recent call first):
  scripts/cmake/vcpkg_from_gitlab.cmake:113 (vcpkg_download_distfile)
  ports/poppler/portfile.cmake:2 (vcpkg_from_gitlab)
  scripts/ports.cmake:206 (include)



```

**Additional context**

<details><summary>vcpkg.json</summary>

```
{
  "name": "ai-flashcard",
  "version-string": "0.1.0",
  "dependencies": [
    "crow",
    "cpr",
    "nlohmann-json",
    "poppler"
  ]
}

```
</details>
