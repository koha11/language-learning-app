import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FolderOpen, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import CollectionList from "../components/collectionList";
import CollectionSkeleton from "../components/collectionSkeleton";
import { useGetCollections } from "../hooks/collection.hooks";

const PublicCollection = () => {
    const { data, isLoading } = useGetCollections("public");

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className=" mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                                <FolderOpen className="w-8 h-8 text-primary" />
                                Public Collections
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                All public collections in community
                            </p>
                        </div>
                        <Link to={`/collections`}>
                            <Button size="lg">
                                <FolderOpen className="w-5 h-5 mr-2" />
                                Your Collections
                            </Button>
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <CollectionSkeleton key={i} />
                            ))}
                        </div>
                    ) : (
                        <CollectionList collections={data!} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default PublicCollection