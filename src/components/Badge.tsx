const Badge = ({ text }) => {
  return (
    <span className='relative inline-block overflow-hidden rounded-full p-[1px]'>
      <span className='absolute inset-[-1000%] bg-gradient-to-r from-[#E8D4B6] via-[#E8D4B6] to-[#E8D4B6]' />
      <div className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-3 py-1 text-xs font-medium text-gray-50 backdrop-blur-3xl'>
        {text}
      </div>
    </span>
  );
};

export default Badge;