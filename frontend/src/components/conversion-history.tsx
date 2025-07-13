import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { getConversionHistory, deleteConversionHistory } from "../services/api";
import { Conversion } from "../types/conversion";

export const ConversionHistory = () => {
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string>("");

  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const history = await getConversionHistory();
      setConversions(history);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load history");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteHistory = useCallback(async () => {
    if (
      !window.confirm("Are you sure you want to delete all conversion history?")
    ) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      await deleteConversionHistory();
      setConversions([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete history");
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const formatDate = useCallback((dateString: string): string => {
    return new Date(dateString).toLocaleString();
  }, []);

  const getConversionTypeLabel = useCallback((type: string): string => {
    return type === "roman-to-arabic" ? "Roman → Arabic" : "Arabic → Roman";
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Conversion History</h3>
        <nav aria-label="History actions">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={isLoading}
              onClick={loadHistory}
              aria-label="Refresh conversion history"
            >
              {isLoading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={isDeleting || conversions.length === 0}
              onClick={handleDeleteHistory}
              aria-label="Clear all conversion history"
            >
              {isDeleting ? "Deleting..." : "Clear History"}
            </Button>
          </div>
        </nav>
      </header>

      {error && (
        <div
          className="p-3 bg-red-50 border border-red-200 rounded-lg"
          role="alert"
        >
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8" aria-live="polite">
          <p className="text-gray-500">Loading history...</p>
        </div>
      ) : conversions.length === 0 ? (
        <div className="text-center py-8" aria-live="polite">
          <p className="text-gray-500">No conversion history found</p>
        </div>
      ) : (
        <div
          className="space-y-3"
          role="list"
          aria-label="Conversion history list"
        >
          {conversions.map((conversion) => (
            <article
              key={conversion._id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              role="listitem"
            >
              <header className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600">
                  {getConversionTypeLabel(conversion.conversionType)}
                </span>
                <time
                  className="text-xs text-gray-500"
                  dateTime={conversion.createdAt}
                >
                  {formatDate(conversion.createdAt)}
                </time>
              </header>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Input</p>
                  <p className="font-mono text-sm">{conversion.inputValue}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Result</p>
                  <p className="font-mono text-sm font-semibold text-green-600">
                    {conversion.convertedValue}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
