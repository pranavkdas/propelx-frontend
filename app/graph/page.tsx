import GraphComponent from '@/components/dagrejsGraphComponent';
import marketingHypothesesData from '../data';


export default function Home() {
  return (
    <div className="h-64 w-64">
      < GraphComponent marketingHypothesesData={marketingHypothesesData} />
    </div >
  );
}
