<#
.SYNOPSIS
  Vercel 프로덕션에 NEXT_PUBLIC_SITE_URL을 설정합니다(서치콘솔 속성 URL과 동일한 https origin).

.DESCRIPTION
  npx vercel env add ... --value ... --yes --force --no-sensitive
  로 비대화형 추가/덮어쓰기합니다. 로그인은 미리 `npm run vercel:login` 또는 VERCEL_TOKEN 으로 CI 토큰.

.PARAMETER SiteUrl
  예: https://gachon-educonsulting-site.vercel.app (끝 슬래시 없음 권장)

.EXAMPLE
  .\scripts\set-vercel-site-url.ps1 -SiteUrl "https://gachon-educonsulting-site.vercel.app"
#>
param(
  [Parameter(Mandatory = $false)]
  [string] $SiteUrl = $env:VERCEL_SITE_URL
)

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

if (-not $SiteUrl -or $SiteUrl.Trim() -eq "") {
  Write-Error "SiteUrl 이 필요합니다. 예: -SiteUrl `"https://...`" 또는 환경 변수 VERCEL_SITE_URL"
  exit 1
}

$trimmed = $SiteUrl.Trim().TrimEnd("/")
if ($trimmed -notmatch "^https://") {
  Write-Error "SiteUrl은 https:// 로 시작해야 합니다: $SiteUrl"
  exit 1
}

Write-Host "Vercel production 에 NEXT_PUBLIC_SITE_URL 설정: $trimmed"

$npx = "npx"
$vercelArgs = @(
  "vercel@latest",
  "env", "add",
  "NEXT_PUBLIC_SITE_URL",
  "production",
  "--value", $trimmed,
  "--yes",
  "--force",
  "--no-sensitive"
)

if ($env:VERCEL_TOKEN) {
  $vercelArgs += @("-t", $env:VERCEL_TOKEN)
}

& $npx @vercelArgs
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host ""
Write-Host "완료. 다음을 권장합니다:"
Write-Host "  1) Vercel 대시보드에서 NEXTAUTH_URL 이 프로덕션 URL과 맞는지 확인"
Write-Host "  2) npm run deploy  (또는 Git 푸시로 자동 배포)"
Write-Host "  3) npm run seo:verify -- $trimmed"
