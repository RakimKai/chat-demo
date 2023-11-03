const Message = ({ text, id }) => {
  return (
    <div className={`flex flex-col ${id ? "items-end" : "items-start"} `}>
      <p className={`bg-primary-400 mx-5 my-2 p-2 w-fit rounded `}>{text}</p>
    </div>
  );
};

export default Message;
