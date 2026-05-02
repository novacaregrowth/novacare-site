type PanelFeaturesProps = {
  features: readonly string[];
};

export function PanelFeatures({ features }: PanelFeaturesProps) {
  return (
    <ul className="space-y-3">
      {features.map((feature, i) => (
        <li
          key={i}
          className="font-sans font-normal text-bone text-[13px] leading-[1.5]"
        >
          {feature}
        </li>
      ))}
    </ul>
  );
}
