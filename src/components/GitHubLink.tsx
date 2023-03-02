import { RxGithubLogo } from 'react-icons/rx';

const GitHubLink = () => {
  return (
    <footer className="absolute bottom-5">
      <a href="https://github.com/MateoPresaCastro/convolve.me">
        <RxGithubLogo className="h-5 w-5 cursor-pointer text-zinc-400 transition duration-300 ease-in-out hover:text-zinc-700" />
      </a>
    </footer>
  );
};

export default GitHubLink;
