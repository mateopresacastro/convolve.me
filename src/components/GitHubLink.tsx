import { RxGithubLogo } from 'react-icons/rx';

const GitHubLink = () => {
  return (
    <footer className="absolute bottom-5 flex flex-col items-center justify-center">
      <a
        href="https://github.com/MateoPresaCastro/convolve.me"
        aria-label="Github"
      >
        <RxGithubLogo className="h-5 w-5 cursor-pointer text-zinc-400 transition duration-300 ease-in-out hover:text-zinc-700" />
      </a>
      <p className="mt-3 text-xs text-zinc-400"> By Mateo Presa</p>
    </footer>
  );
};

export default GitHubLink;
