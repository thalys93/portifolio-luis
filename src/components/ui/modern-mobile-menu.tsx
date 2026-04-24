import React, { useEffect, useMemo, useRef, useState } from "react";
import { Briefcase, Calendar, Home, Settings, Shield } from "lucide-react";
import { Link } from "react-router-dom";

type IconComponentType = React.ElementType<{ className?: string }>;

export interface InteractiveMenuItem {
  id: string;
  label: string;
  icon: IconComponentType;
  to?: string;
}

export interface InteractiveMenuProps {
  items?: InteractiveMenuItem[];
  accentColor?: string;
  className?: string;
  onItemClick?: (item: InteractiveMenuItem, index: number) => void;
  activeId?: string;
}

const defaultItems: InteractiveMenuItem[] = [
  { id: "home", label: "home", icon: Home },
  { id: "strategy", label: "strategy", icon: Briefcase },
  { id: "period", label: "period", icon: Calendar },
  { id: "security", label: "security", icon: Shield },
  { id: "settings", label: "settings", icon: Settings },
];

const defaultAccentColor = "var(--component-active-color-default)";

function InteractiveMenu({
  items,
  accentColor,
  className,
  onItemClick,
  activeId,
}: InteractiveMenuProps) {
  const finalItems = useMemo(() => {
    const isValid =
      items && Array.isArray(items) && items.length >= 2 && items.length <= 6;

    if (!isValid) {
      return defaultItems;
    }

    return items;
  }, [items]);

  const [activeIndex, setActiveIndex] = useState(0);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (activeIndex >= finalItems.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, finalItems.length]);

  useEffect(() => {
    if (!activeId) return;
    const nextIndex = finalItems.findIndex((item) => item.id === activeId);
    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
    }
  }, [activeId, finalItems]);

  useEffect(() => {
    const setLineWidth = () => {
      const activeItemElement = itemRefs.current[activeIndex];
      const activeTextElement = textRefs.current[activeIndex];

      if (!activeItemElement || !activeTextElement) {
        return;
      }

      const textWidth = activeTextElement.offsetWidth;
      activeItemElement.style.setProperty("--lineWidth", `${textWidth}px`);
    };

    setLineWidth();
    window.addEventListener("resize", setLineWidth);
    return () => window.removeEventListener("resize", setLineWidth);
  }, [activeIndex, finalItems]);

  const navStyle = useMemo(() => {
    const activeColor = accentColor || defaultAccentColor;
    return { "--component-active-color": activeColor } as React.CSSProperties;
  }, [accentColor]);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    onItemClick?.(finalItems[index], index);
  };

  return (
    <nav
      role="navigation"
      aria-label="Navegação mobile"
      className={`menu ${className ?? ""}`.trim()}
      style={navStyle}
    >
      {finalItems.map((item, index) => {
        const isActive = index === activeIndex;
        const IconComponent = item.icon;

        return (
          item.to ? (
            <Link
              key={item.id}
              to={item.to}
              className={`menu__item ${isActive ? "active" : ""}`}
              onClick={() => handleItemClick(index)}
              ref={(el) => (itemRefs.current[index] = el)}
              style={{ "--lineWidth": "0px" } as React.CSSProperties}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="menu__icon">
                <IconComponent className="icon" />
              </div>
              <strong
                className={`menu__text ${isActive ? "active" : ""}`}
                ref={(el) => (textRefs.current[index] = el)}
              >
                {item.label}
              </strong>
            </Link>
          ) : (
            <button
              key={item.id}
              type="button"
              className={`menu__item ${isActive ? "active" : ""}`}
              onClick={() => handleItemClick(index)}
              ref={(el) => (itemRefs.current[index] = el)}
              style={{ "--lineWidth": "0px" } as React.CSSProperties}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="menu__icon">
                <IconComponent className="icon" />
              </div>
              <strong
                className={`menu__text ${isActive ? "active" : ""}`}
                ref={(el) => (textRefs.current[index] = el)}
              >
                {item.label}
              </strong>
            </button>
          )
        );
      })}
    </nav>
  );
}

export { InteractiveMenu };
