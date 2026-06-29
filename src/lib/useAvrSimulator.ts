"use client";

import { useCallback, useRef, useState } from "react";
import {
  AVRIOPort,
  AVRTimer,
  CPU,
  PinState,
  avrInstruction,
  portBConfig,
  portDConfig,
  timer0Config,
  timer1Config,
  timer2Config,
} from "avr8js";
import { parseIntelHex } from "@/lib/intelHex";

const PIN13_BIT = 5; // PB5
const PIN2_BIT = 2; // PD2
const CYCLES_PER_FRAME = 500000; // ~16ms of 16MHz CPU time per animation frame

export function useAvrSimulator() {
  const [running, setRunning] = useState(false);
  const [ledOn, setLedOn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const portDRef = useRef<AVRIOPort | null>(null);
  const frameRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setRunning(false);
  }, []);

  const run = useCallback(
    (hex: string) => {
      stop();
      setError(null);

      let progMem: Uint16Array;
      try {
        progMem = parseIntelHex(hex);
      } catch {
        setError("Could not read the compiled program.");
        return;
      }

      const cpu = new CPU(progMem);
      const portB = new AVRIOPort(cpu, portBConfig);
      const portD = new AVRIOPort(cpu, portDConfig);
      new AVRTimer(cpu, timer0Config);
      new AVRTimer(cpu, timer1Config);
      new AVRTimer(cpu, timer2Config);

      portDRef.current = portD;
      portD.setPin(PIN2_BIT, true); // button unpressed = pulled high

      portB.addListener(() => {
        const state = portB.pinState(PIN13_BIT);
        setLedOn(state === PinState.High);
      });

      function loop() {
        for (let i = 0; i < CYCLES_PER_FRAME; i++) {
          avrInstruction(cpu);
          cpu.tick();
        }
        frameRef.current = requestAnimationFrame(loop);
      }

      setRunning(true);
      frameRef.current = requestAnimationFrame(loop);
    },
    [stop]
  );

  const setButtonPressed = useCallback((pressed: boolean) => {
    // Button wired with INPUT_PULLUP: pressed = pulled to ground (Low)
    portDRef.current?.setPin(PIN2_BIT, !pressed);
  }, []);

  return { run, stop, running, ledOn, error, setButtonPressed };
}
