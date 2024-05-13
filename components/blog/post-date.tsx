import { format } from 'date-fns';

export default function PostDate({ date }: { date: string }) {
  return (
    <div className="bg-white px-2 py-1 md:py-2 md:px-4 rounded-full">
      <p className="font-semibold text-sm text-indigo-500">
        {format(new Date(date), 'PP')}
      </p>
    </div>
  );
}
