import NormalInput from "../Input/NormalInput";

interface ClusterHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function ClusterHeader({
  search,
  onSearchChange,
}: ClusterHeaderProps) {
  return (
    <div>
      <h1 className="font-serif text-center text-lg">Connect</h1>
      <div className="mt-4">
        <NormalInput
          placeholder="Search..."
          inputClassName="!bg-gray-neutral-300"
          name="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
