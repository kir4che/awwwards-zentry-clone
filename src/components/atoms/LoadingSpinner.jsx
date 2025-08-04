const LoadingSpinner = () => (
  <div className='flex-center absolute z-[999] h-dvh w-dvw overflow-hidden'>
    <div className='three-body'>
      <div className='three-body__dot'></div>
      <div className='three-body__dot'></div>
      <div className='three-body__dot'></div>
    </div>
  </div>
);

export default LoadingSpinner;
