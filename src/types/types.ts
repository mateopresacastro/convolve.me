export interface FileInputProps {
  handleSampleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  label: string;
  id: 'firstSample' | 'secondSample';
}
