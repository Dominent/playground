$LIBRARY_NAME = 'barebones.js';
$PATTERN = '\/\* IF DEV \*\/[\S\s]*\/\* END IF \*\/';
$BUILD_PATH = "./bin";

$Files = @(
    (Get-Content -Path './bootstrap.js' | Out-String ),
    (Get-Content -Path './client/Barebones.js' | Out-String ),
    (Get-Content -Path './client/DataBinder.js' | Out-String),
    (Get-Content -Path './client/EventsManager.js' | Out-String),
    (Get-Content -Path './client/ExceptionsManager.js' | Out-String),
    (Get-Content -Path './client/ModuleBuilder.js' | Out-String),
    (Get-Content -Path './client/Renderer.js' | Out-String)
)

if(!(Test-Path $BUILD_PATH)) {
    New-Item -ItemType directory -Path $BUILD_PATH
}

$Files -replace  $PATTERN, "" -join "`r`n"  | Out-String | Set-Content "$BUILD_PATH\$LIBRARY_NAME"

Copy-Item `
    './server/Router.js', `
    './server/Server.js', `
    './server/TemplateEngine.js' `
    -Destination $BUILD_PATH


 
