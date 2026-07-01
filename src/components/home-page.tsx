import Link from "next/link";
import { categories, recommendedTools } from "@/lib/tool-data";

export function HomePage() {
  return (
    <div className="C">
      <div className="container_m">
        <h3 className="TS" id="toolsUsage">
          ابزار های کاربردی
        </h3>
        <div className="box_tools">
          {categories.map((category) => (
            <HomePageCard
              key={category.url}
              title={category.title}
              icon={category.icon}
              link={category.url}
              description={`${category.item.length} ابزار محاسباتی`}
            />
          ))}
        </div>

        <h3 className="TS" id="toolsRecomendend">
          ابزار های پیشنهادی
        </h3>
        <div className="box_tools">
          {recommendedTools.map((tool) => (
            <HomePageCard
              key={tool.url}
              title={tool.title}
              icon={tool.icon}
              link={tool.url}
              description={tool.info}
              external
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomePageCard({
  title,
  icon,
  link,
  description,
  external = false,
}: {
  title: string;
  icon: string;
  link: string;
  description: string;
  external?: boolean;
}) {
  const content = (
    <div className="box_h">
      <div
        className="iconBox fontIconNew"
        dangerouslySetInnerHTML={{ __html: `&#x${icon}` }}
      />
      <div className="notifi" />
      <div className="title">{title}</div>
      <div className="tools_length">{description}</div>
    </div>
  );

  if (external) {
    return (
      <a href={link} title={title} target="_blank" rel="noreferrer" className="container_box">
        {content}
      </a>
    );
  }

  return (
    <Link href={link} className="container_box">
      {content}
    </Link>
  );
}
