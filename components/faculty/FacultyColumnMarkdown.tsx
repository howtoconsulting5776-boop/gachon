import ReactMarkdown from "react-markdown";

interface FacultyColumnMarkdownProps {
  markdown: string;
}

export function FacultyColumnMarkdown({ markdown }: FacultyColumnMarkdownProps) {
  return (
    <div className="faculty-column-prose break-keep text-gray-800">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-gachon-900">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 mt-10 text-xl font-semibold text-gachon-900">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-8 text-lg font-semibold text-gachon-900">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-gray-700 last:mb-0">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gachon-900">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-2 pl-5 text-gray-700">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-2 pl-5 text-gray-700">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          hr: () => <hr className="my-8 border-gray-200" />,
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-gachon-600 underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target={href?.startsWith("http") ? "_blank" : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
