"use client";

import useClusterProfile from "./hook/useClusterProfile";
import NewProfileCluster from "./NewProfileCluster";
import ProfileClusterItem from "./ProfileClusterItem";
import { ProfileClusterItemSkeleton } from "./ProfileCLusterSkeleton";

export default function ProfileCluster() {
  const SKELETON_NUMBER = 4;
  const { allClusers, isLoading } = useClusterProfile();

  return (
    <div className="grid grid-cols-5 gap-[60px] mt-20 items-start">
      <NewProfileCluster />
      {allClusers.map((cluster) => (
        <ProfileClusterItem
          key={cluster._id}
          clusterElement={cluster.elementIds.length}
          clusterName={cluster.clusterName}
        />
      ))}
      {isLoading &&
        Array.from({ length: SKELETON_NUMBER }).map((_, index) => (
          <ProfileClusterItemSkeleton key={index} />
        ))}
    </div>
  );
}
