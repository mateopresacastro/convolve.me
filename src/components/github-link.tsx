import { RxGithubLogo } from "react-icons/rx";

export default function GitHubLink() {
  return (
    <footer className="my-9 flex w-full flex-col items-center justify-center">
      <a
        href="https://github.com/MateoPresaCastro/convolve.me"
        aria-label="Github"
      >
        <RxGithubLogo className="h-5 w-5 cursor-pointer text-neutral-400 transition duration-300 ease-in-out hover:text-neutral-700" />
      </a>
      <p className="mt-2 text-xs text-neutral-400">By Mateo Presa</p>
    </footer>
  );
}
