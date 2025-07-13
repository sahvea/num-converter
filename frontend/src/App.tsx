import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Converter } from "./components/converter";
import { ConversionHistory } from "./components/conversion-history";

function App() {
  const [activeTab, setActiveTab] = useState("roman-arabic");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Numeral Converter
          </h1>
          <p className="text-gray-600">
            Convert between Roman and Arabic numerals with history tracking
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Converter
            </h2>

            <nav aria-label="Conversion type selection">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="roman-arabic">Roman → Arabic</TabsTrigger>
                  <TabsTrigger value="arabic-roman">Arabic → Roman</TabsTrigger>
                </TabsList>

                <TabsContent value="roman-arabic" className="mt-6">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Enter a Roman numeral to convert to Arabic number
                    </p>

                    <Converter type="roman-to-arabic" />
                  </div>
                </TabsContent>

                <TabsContent value="arabic-roman" className="mt-6">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Enter an Arabic number (1-3999) to convert to Roman
                      numeral
                    </p>

                    <Converter type="arabic-to-roman" />
                  </div>
                </TabsContent>
              </Tabs>
            </nav>
          </article>

          <aside className="bg-white rounded-lg shadow-md p-6">
            <ConversionHistory />
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;
