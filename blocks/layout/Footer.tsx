import SvgIcon from "components/icons/SvgIcon";

const Footer = () => {
  return (
    <div className="flex gap-4">
      <a href="" className="bg-[#1da1f2] text-white rounded-md p-3">
        <SvgIcon name="TwitterFill" className="inline w-4 h-4 fill-white mr-2" />
        Twitter
      </a>
      <a
        href="https://github.com/stonega/web3tools"
        target="_blank"
        className="bg-[#24292F] text-white rounded-md p-3"
        rel="noreferrer"
      >
        <SvgIcon name="GitHub" className="inline w-4 h-4 fill-white mr-2" />
        GitHub
      </a>
    </div>
  );
};

export default Footer;
