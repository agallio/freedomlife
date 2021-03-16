const GuideLoading: React.FC = () => (
  <>
    {[1, 2].map((item) => (
      <div
        key={item}
        className="flex flex-col shadow-md rounded-lg mt-4 bg-white dark:bg-gray-700"
      >
        <div className="flex items-center justify-between w-full px-4 py-2 rounded-t-lg animate-pulse border-b border-[#e2e2e2] dark:border-[#6b7280]">
          <div className="flex flex-col w-10/12">
            <div className="w-2/4 h-4 bg-gray-200 rounded-lg dark:bg-gray-500" />
            <div className="mt-2 w-2/3 h-3 bg-gray-200 rounded-lg dark:bg-gray-500" />
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-500" />
        </div>
        <div className="px-4 py-3 animate-pulse">
          {[1, 2, 3].map((item) => (
            <div key={item}>
              <div className="w-2/4 h-4 bg-gray-200 rounded-lg dark:bg-gray-500" />
              <div className="my-3 w-2/3 h-3 bg-gray-200 rounded-lg dark:bg-gray-500" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </>
)

export default GuideLoading
