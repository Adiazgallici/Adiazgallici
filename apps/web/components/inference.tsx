import type { Project } from "@/lib/projects";

export function Inference({ project }: { project: Project }) {
  const { io } = project;
  return (
    <div className="inference">
      <div className="io io-in">
        <span className="io-key">Input</span>
        {io.inputIsCode ? <code>{io.input}</code> : <p>{io.input}</p>}
      </div>
      <div className="io-model" aria-hidden="true">
        <span className="io-line" />
        <span className="io-name">{project.name}</span>
        <span className="io-line" />
      </div>
      <div className="io io-out">
        <span className="io-key">Output</span>
        {io.outputIsCode ? <code>{io.output}</code> : <p>{io.output}</p>}
      </div>
    </div>
  );
}
