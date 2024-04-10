import BigNumber from "./BigNumber";

const BlogCard = ({ subj, num }) => {
  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="flex-1 flex flex-row justify-between p-4">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {subj}
        </h5>
        <BigNumber num={num} />
      </div>
    </div>
  );
};

export default BlogCard;
