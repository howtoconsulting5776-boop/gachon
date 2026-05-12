# public/files/

정적 다운로드 자료(PDF/HWP 등)를 둡니다. 이 폴더의 파일은 `/files/<파일명>` URL로 그대로 서빙됩니다.

## 사용 중 파일

| 파일명 | 페이지 | 다운로드 표시 이름 |
|---|---|---|
| `edu-consulting-brochure-2026-late.pdf` | `/admissions/brochure`, `/resources` | `가천대_에듀컨설팅전공_2026후기_모집요강.pdf` |

## 명명 규칙

- URL/파일명은 영문 kebab-case, 한글 금지 (URL 인코딩 이슈 방지)
- 사용자가 다운받을 때 보일 한글 이름은 `<a download="...">` 속성으로 지정
- 새 파일을 추가하면 위 표와 사용 페이지를 함께 업데이트
