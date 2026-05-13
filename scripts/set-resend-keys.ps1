<#
.SYNOPSIS
  Vercel 프로덕션에 Resend 발송용 환경변수를 비대화형으로 설정합니다.

.DESCRIPTION
  입학 상담 신청 알림 메일이 실제로 발송되려면 RESEND_API_KEY 가 필요합니다.
  본 스크립트는 한 번의 명령으로 RESEND_API_KEY 와(선택) RESEND_FROM_EMAIL 을
  Vercel 프로덕션 환경에 등록(또는 덮어쓰기)하고, 변경사항을 적용하기 위해
  프로덕션 재배포를 트리거합니다.

.PARAMETER ApiKey
  Resend 대시보드의 API Keys 메뉴에서 발급한 키. 형식: re_xxxxxxxxxxxx

.PARAMETER FromEmail
  (선택) 발신자 표기. 도메인 미인증 시 비워두면 onboarding@resend.dev 사용.
  예: "가천대 에듀컨설팅 <news@your-verified-domain.com>"

.PARAMETER SkipRedeploy
  스위치. 환경변수만 등록하고 재배포는 건너뜁니다.

.EXAMPLE
  npm run resend:set -- -ApiKey "re_xxxxxxxxxxxx"

.EXAMPLE
  npm run resend:set -- -ApiKey "re_xxxxxxxxxxxx" -FromEmail "에듀컨설팅 <news@gachon.ac.kr>"

.NOTES
  사전 조건:
    1) npm run vercel:login (또는 VERCEL_TOKEN 환경변수)
    2) npm run vercel:link  (또는 .vercel/project.json 이 이미 있음)
#>
param(
  [Parameter(Mandatory = $false)]
  [string] $ApiKey = $env:RESEND_API_KEY,

  [Parameter(Mandatory = $false)]
  [string] $FromEmail = $env:RESEND_FROM_EMAIL,

  [switch] $SkipRedeploy
)

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

if (-not $ApiKey -or $ApiKey.Trim() -eq "") {
  Write-Error "ApiKey 가 필요합니다. 예: -ApiKey `"re_xxxxxxxxxxxx`" (https://resend.com/api-keys)"
  exit 1
}

$ApiKey = $ApiKey.Trim()
if ($ApiKey -notmatch "^re_") {
  Write-Warning "Resend API Key 는 일반적으로 're_'로 시작합니다. 입력값을 다시 확인해 주세요. 그래도 계속 진행합니다."
}

function Set-VercelEnv {
  param(
    [string] $Name,
    [string] $Value,
    [string] $EnvScope = "production"
  )

  Write-Host ("[set] Vercel {0}: {1} 등록" -f $EnvScope, $Name)

  $cmdArgs = @(
    "vercel@latest", "env", "add",
    $Name, $EnvScope,
    "--value", $Value,
    "--yes",
    "--force"
  )

  if ($env:VERCEL_TOKEN) {
    $cmdArgs += @("-t", $env:VERCEL_TOKEN)
  }

  & npx @cmdArgs
  if ($LASTEXITCODE -ne 0) {
    Write-Error ("{0} 설정 실패 (vercel CLI exit {1})" -f $Name, $LASTEXITCODE)
    exit $LASTEXITCODE
  }
}

Set-VercelEnv -Name "RESEND_API_KEY" -Value $ApiKey -EnvScope "production"

if ($FromEmail -and $FromEmail.Trim() -ne "") {
  Set-VercelEnv -Name "RESEND_FROM_EMAIL" -Value $FromEmail.Trim() -EnvScope "production"
} else {
  Write-Host "[info] FromEmail 미제공: 발신자는 onboarding@resend.dev 가 사용됩니다 (도메인 인증 없이도 동작, 다만 스팸함 확인 권장)."
}

Write-Host ""
Write-Host "환경변수 등록 완료."

if ($SkipRedeploy) {
  Write-Host "[info] -SkipRedeploy 지정됨: 재배포 생략. 직접 'npm run deploy' 실행 필요."
  exit 0
}

Write-Host ""
Write-Host "변경사항을 적용하기 위해 프로덕션 재배포를 시작합니다..."
& npx vercel@latest --prod --yes
if ($LASTEXITCODE -ne 0) {
  Write-Error ("재배포 실패 (vercel CLI exit {0})" -f $LASTEXITCODE)
  exit $LASTEXITCODE
}

Write-Host ""
Write-Host "완료. 입학 상담 페이지 https://gachon-educonsulting-site.vercel.app/admissions/inquiry 에서"
Write-Host "테스트 신청을 한 뒤 bear5776@gachon.ac.kr 메일함을 확인해 주세요."
