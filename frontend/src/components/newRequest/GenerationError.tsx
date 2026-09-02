type Props = {
  error: string;
};

export default function GenerationError({ error }: Props) {
  return (
    <div
      role="alert"
      className="whitespace-pre-line rounded-xl border border-destructive/20 bg-destructive-soft px-4 py-3"
    >
      <p className="text-sm font-medium leading-5 text-destructive">{error}</p>
    </div>
  );
}
