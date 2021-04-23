import { useContext } from "react";
import { SettingsContext } from "../context";

export default function useSelectedWriter() {
  const { selectedWriterIndex, setSelectedWriterIndex } = useContext(SettingsContext);
  
  return {
    selectedWriterIndex,
    setSelectedWriterIndex
  }
}
