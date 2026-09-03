interface ForecastDay {
  day: string;
  temp: string;
  icon: string;
  rain: string;
}

interface WeatherPreviewCardProps {
  current: string;
  condition: string;
  windSpeed: string;
  windDirection: string;
  rainChance: string;
  sunrise: string;
  sunset: string;
  forecast: ForecastDay[];
  disclaimer: string;
}

export default function WeatherPreviewCard({
  current,
  condition,
  windSpeed,
  windDirection,
  rainChance,
  sunrise,
  sunset,
  forecast,
  disclaimer,
}: WeatherPreviewCardProps) {
  return (
    <section id="weather" className="scroll-mt-28 py-14 md:py-20 bg-background-100/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mb-8">Lake Weather</h2>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[320px] flex-shrink-0">
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-4xl font-semibold text-foreground-900 font-heading">{current}</p>
                  <p className="text-sm text-foreground-600 mt-1">{condition}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center">
                  <i className="ri-sun-line text-xl text-accent-600"></i>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-background-100/70 rounded-lg p-3">
                  <p className="text-[10px] text-foreground-500 font-medium uppercase tracking-wider">Wind</p>
                  <p className="text-xs font-semibold text-foreground-800 mt-0.5">{windSpeed} {windDirection}</p>
                </div>
                <div className="bg-background-100/70 rounded-lg p-3">
                  <p className="text-[10px] text-foreground-500 font-medium uppercase tracking-wider">Rain chance</p>
                  <p className="text-xs font-semibold text-foreground-800 mt-0.5">{rainChance}</p>
                </div>
                <div className="bg-background-100/70 rounded-lg p-3">
                  <p className="text-[10px] text-foreground-500 font-medium uppercase tracking-wider">Sunrise</p>
                  <p className="text-xs font-semibold text-foreground-800 mt-0.5">{sunrise}</p>
                </div>
                <div className="bg-background-100/70 rounded-lg p-3">
                  <p className="text-[10px] text-foreground-500 font-medium uppercase tracking-wider">Sunset</p>
                  <p className="text-xs font-semibold text-foreground-800 mt-0.5">{sunset}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
              <h3 className="text-sm font-semibold text-foreground-800 mb-4">5-day forecast</h3>
              <div className="grid grid-cols-5 gap-2">
                {forecast.map((day) => (
                  <div key={day.day} className="text-center p-2 rounded-lg hover:bg-background-100/50 transition-colors">
                    <p className="text-[10px] font-medium text-foreground-500 mb-1.5">{day.day}</p>
                    <i className={`${day.icon} text-lg text-foreground-600 block mb-1.5`}></i>
                    <p className="text-xs font-semibold text-foreground-800">{day.temp}</p>
                    <p className="text-[10px] text-foreground-500 mt-0.5">{day.rain} rain</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-foreground-500 mt-4 leading-relaxed">{disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}