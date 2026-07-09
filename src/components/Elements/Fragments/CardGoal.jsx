import React from "react";
import Card from "../Card";
import Icon from "../Icon";
import CompositionExample from "../CompositionExample";
import CircularProgress from '@mui/material/CircularProgress';

function CardGoal(props) {
  let { data } = props;

  // JIKA data yang dikirim ternyata array, paksa ambil indeks pertama di dalam komponen
  if (Array.isArray(data)) {
    data = data[0];
  }

  // Sinkronisasi Nama Properti (Mendukung target_amount, present_amount, target, present)
  const targetAmount = data?.target_amount || data?.target || 0;
  const presentAmount = data?.present_amount || data?.present || 0;

  // Hitung persentase untuk grafik lingkaran gauge
  const chartValue = targetAmount > 0 ? (presentAmount / targetAmount) * 100 : 0;

  // Format angka tengah dalam grafis (misal: jika present 10000 maka tampil 10K)
  const displayK = presentAmount >= 1000 ? `${(presentAmount / 1000).toFixed(0)}K` : presentAmount;

  // ... sisa kode chartData dan return () di bawahnya sama seperti sebelumnya ...
  const chartData = (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <div className="flex">
          <span className="text-2xl font-bold me-4">
            ${targetAmount}
          </span>
          <div className="p-2 bg-gray-05 text-gray-01 rounded-md box-border">
            <Icon.Edit size={16} />
          </div>
        </div>
        <div>Nov, 2023</div>
      </div>
      <div className="border-b-2 border-gray-05 my-4"></div>
      <div className="flex justify-between">
        <div>
          <div className="flex mt-3 mb-10 text-gray-01">
            <Icon.Award />
            <div className="ms-2">
              <div>Target Achieved</div>
              <div className="font-bold text-xl text-black">
                ${presentAmount}
              </div>
            </div>
          </div>
          <div className="flex text-gray-01">
            <Icon.Target />
            <div className="ms-2">
              <div>This Month Target</div>
              <div className="font-bold text-xl text-black">
                ${targetAmount}
              </div>
            </div>
          </div>
        </div>
        <div className="ms-4 text-center">
          <CompositionExample data={chartValue} />
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-03">$0</span>
            <span className="font-bold text-lg">{displayK}</span>
            <span className="text-gray-03">$20K</span>
          </div>
          <div className="mt-2 text-xs text-gray-400">Target vs Achievement</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Card 
        title="Goals"
        desc={
          !data || Object.keys(data).length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full text-primary">
              <CircularProgress color="inherit" size={50} enableTrackSlot />
              <p className="mt-2 text-sm font-medium">Loading Data</p>
            </div>
          ) : (
            chartData
          )
        } 
      />
    </>
  );
}

export default CardGoal;