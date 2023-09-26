export default function GuideLoading() {
  return (
    <>
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="mt-4 flex flex-col rounded-lg bg-white shadow-md dark:bg-gray-700"
        >
          <div className="flex w-full animate-pulse items-center justify-between rounded-t-lg border-b border-[#e2e2e2] px-4 py-2 dark:border-[#6b7280]">
            <div className="flex w-10/12 flex-col">
              <div className="h-4 w-2/4 rounded-lg bg-gray-200 dark:bg-gray-500" />
              <div className="mt-2 h-3 w-2/3 rounded-lg bg-gray-200 dark:bg-gray-500" />
            </div>
            <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-500" />
          </div>
          <div className="animate-pulse px-4 py-3">
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <div className="h-4 w-2/4 rounded-lg bg-gray-200 dark:bg-gray-500" />
                <div className="my-3 h-3 w-2/3 rounded-lg bg-gray-200 dark:bg-gray-500" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
