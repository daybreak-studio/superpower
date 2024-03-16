// This is an example component. When making new components:
// 1. Create a new folder inside of /components/ with PascalCasing where each word is capitalized.
// 2. Create a new file inside called index.tsx

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}
