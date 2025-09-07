import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useNuiEvent, useNuiVisibility } from '@/hooks/useNuiEvent';
import { fetchNui, isEnvBrowser } from '@/utils/nui';
import type { PlayerCoords } from '@/types/fivem';

function App() {
  const [visible, setVisible] = useState<boolean>(isEnvBrowser());
  const [playerCoords, setPlayerCoords] = useState<PlayerCoords | null>(null);
  const [loading, setLoading] = useState(false);

  useNuiEvent({
    setVisible: (isVisible: boolean) => {
      setVisible(isVisible);
    },
  });

  useNuiVisibility();

  const handleGetCoords = async () => {
    setLoading(true);
    try {
      const coords = await fetchNui<PlayerCoords>('getClientData', {
        message: 'Getting player coordinates',
      });
      setPlayerCoords(coords);
    } catch (error) {
      console.error('Failed to get coordinates:', error);
      if (isEnvBrowser()) {
        setPlayerCoords({ x: 123.45, y: 678.90, z: 12.34 });
      }
    }
    setLoading(false);
  };

  const handleHideFrame = () => {
    fetchNui('hideFrame');
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="dark fixed inset-0 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                FiveM React Boilerplate
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                A modern React + Vite + shadcn/ui boilerplate for FiveM resources
              </CardDescription>
            </div>
            <Badge variant="outline" className="h-fit">
              v1.0.0
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="coordinates" className="text-base font-medium">
              Player Coordinates
            </Label>
            
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : playerCoords ? (
              <Card className="border-dashed">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-muted-foreground">
                        X AXIS
                      </Label>
                      <div className="font-mono text-lg font-semibold">
                        {playerCoords.x.toFixed(2)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-muted-foreground">
                        Y AXIS
                      </Label>
                      <div className="font-mono text-lg font-semibold">
                        {playerCoords.y.toFixed(2)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-muted-foreground">
                        Z AXIS
                      </Label>
                      <div className="font-mono text-lg font-semibold">
                        {playerCoords.z.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground">
                      FULL COORDINATES
                    </Label>
                    <Input 
                      value={`${playerCoords.x.toFixed(2)}, ${playerCoords.y.toFixed(2)}, ${playerCoords.z.toFixed(2)}`}
                      readOnly 
                      className="font-mono text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Alert>
                <AlertDescription>
                  Click "Get Coordinates" to fetch your current position in the game world.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <Separator />

          <div className="flex gap-3">
            <Button 
              onClick={handleGetCoords} 
              disabled={loading}
              className="flex-1"
              size="lg"
            >
              {loading ? 'Loading...' : 'Get Coordinates'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleHideFrame}
              size="lg"
            >
              Close
            </Button>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Keyboard Shortcuts
            </Label>
            <div className="grid gap-2">
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <span className="text-sm text-muted-foreground">
                  Press ESC to close this panel
                </span>
                <Badge variant="secondary" className="font-mono">
                  ESC
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <span className="text-sm text-muted-foreground">
                  Use /show-nui command in game
                </span>
                <Badge variant="outline" className="font-mono">
                  /show-nui
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;