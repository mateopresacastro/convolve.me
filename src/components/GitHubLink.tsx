import { RxGithubLogo } from 'react-icons/rx';

const GitHubLink = () => {
  return (
    <div className="absolute bottom-5 z-50 flex h-64 w-64 items-center justify-center overflow-hidden rounded-full text-zinc-600 transition duration-1000 ease-in-out hover:text-zinc-900">
      <a href="https://github.com/MateoPresaCastro/convolve.me">
        <RxGithubLogo className="relative top-14 h-9 w-9 cursor-pointer" />
      </a>
    </div>
  );
};

export default GitHubLink;
