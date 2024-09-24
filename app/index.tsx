import React, { useCallback, useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";

export default function index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Rich />
    </View>
  );
}
function Rich() {
  const { timing, start } = useTiming(300);
  return (
    <>
      <Pressable
        onPress={(e) => {
          start();
        }}
      >
        <Image
          style={{
            transform: [
              {
                scale: 1 + (1 - Math.pow(timing, 0.5)) * 0.2,
              },
              {
                rotateY: `${Math.pow(timing, 0.9) * 180}deg`,
              },
              {
                scaleY: 1 + (1 - timing) * 0.1,
              },
            ],
          }}
          source={require("@/assets/images/dia.webp")}
        />
      </Pressable>
    </>
  );
}
function useTiming(timeDone: number, interval: number = 1000 / 60.0) {
  const [timing, setTiming] = useState(1.0);
  const start = useCallback(() => setTiming(0.0), []);
  useEffect(() => {
    if (timing !== 1.0) {
      const timer = setInterval(() => {
        setTiming((t) => Math.min(1.0, t + interval / timeDone));
      }, interval);
      return () => clearInterval(timer);
    }
  }, [timeDone, interval, timing]);
  return { timing, start };
}
