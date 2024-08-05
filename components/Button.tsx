'use client';

const Button = ({ data }: any) => {
  return (
    <button className="p-4 bg-green-400" onClick={() => console.log(data)}>
      Log
    </button>
  );
};

export default Button;
