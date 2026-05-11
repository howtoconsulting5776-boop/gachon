#requires -Version 5.1
<#
  GitHub에 원격을 만들고 첫 푸시까지 시도합니다.
  사전 조건: gh auth login (또는 GITHUB_TOKEN 환경 변수로 비대화형 로그인)

  사용 예:
    npm run github:publish
    pwsh -File scripts/publish-to-github.ps1
    $env:GITHUB_REPO_NAME = "my-repo"; npm run github:publish

  이미 만든 빈 저장소 URL만 있는 경우:
    git remote add origin https://github.com/USER/REPO.git
    git push -u origin master
#>
$ErrorActionPreference = "Stop"
Set-Location (Resolve-Path (Join-Path $PSScriptRoot "..")).Path

function Get-GhExe {
  $p = Join-Path ${env:ProgramFiles} "GitHub CLI\gh.exe"
  if (Test-Path -LiteralPath $p) { return $p }
  $cmd = Get-Command gh -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Source }
  return $null
}

$gh = Get-GhExe
if (-not $gh) {
  Write-Host "GitHub CLI(gh)가 없습니다. 설치: winget install GitHub.cli"
  exit 1
}

$ErrorActionPreference = "Continue"
$null = & $gh auth status 2>&1
$authExit = $LASTEXITCODE
$ErrorActionPreference = "Stop"
if ($authExit -ne 0) {
  Write-Host @"

GitHub 로그인이 필요합니다. PowerShell에서 한 번 실행하세요:

  & `"$gh`" auth login

토큰만 있는 경우:

  `$env:GITHUB_TOKEN = 'ghp_xxxxxxxx'; `$env:GITHUB_TOKEN | & `"$gh`" auth login --with-token

완료 후 다시: npm run github:publish
"@
  exit 1
}

$repoName = if ($env:GITHUB_REPO_NAME) { $env:GITHUB_REPO_NAME } else { "gachon-educonsulting-site" }

git remote get-url origin 2>$null | Out-Null
if ($LASTEXITCODE -eq 0) {
  Write-Host "origin 이 이미 있습니다. 현재 브랜치를 푸시합니다."
  $branch = (git branch --show-current).Trim()
  git push -u origin $branch
  exit $LASTEXITCODE
}

Write-Host "GitHub 저장소 '$repoName' 생성 및 origin 설정 후 푸시합니다..."
& $gh repo create $repoName `
  --public `
  --source=. `
  --remote=origin `
  --push `
  --description "가천대학교 경영대학원 에듀컨설팅 전공 홈페이지"

exit $LASTEXITCODE
