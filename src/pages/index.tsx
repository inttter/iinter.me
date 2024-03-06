import SocialLink from './components/SocialLink';
import Username from './components/Lanyard'
import ProjectsDrawer from './components/Drawer';

export default function Home() {
  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth">
      <div className="max-w-xl w-full px-4 py-8 space-y-6 text-center">
        <div className="flex items-center justify-center">
          <h1 className="text-6xl md:text-7xl font-bold tracking-wide text-ctp-pink opacity-90 selection:bg-white selection:text-black">
            i'm <Username />
          </h1>
        </div>
        <div className="flex justify-center md:space-x-5 space-x-3 selection:bg-gray-700 bg-transparent" data-theme="lofi">
          <SocialLink href="https://github.com/inttter" src="socials/github.svg" alt="GitHub" tooltipText="github" />
          <SocialLink href="https://steamcommunity.com/id/intermed" src="socials/steam.svg" alt="Steam" tooltipText="steam" />
          <SocialLink href="https://discord.com/users/514106760299151372" src="socials/discord.svg" alt="Discord" tooltipText="discord" />
          <SocialLink href="https://twitter.com/accmpy" src="socials/twitter.svg" alt="Twitter" tooltipText="twitter" />
          <SocialLink href="https://osu.ppy.sh/users/19054376" src="socials/osu.svg" alt="osu!" tooltipText="osu!" />
          <SocialLink href="https://www.last.fm/user/intter" src="/socials/lastfm.svg" alt="Last.fm" tooltipText="last.fm" />
          <div className="tooltip tooltip-bottom text-[#CAD3F5] bg-transparent font-bold mb-2" data-tip="projects" data-theme="lofi" style={{ marginTop: '5px' }}>
          <ProjectsDrawer />
          </div>
        </div>
      </div>
  </div>
  );
}