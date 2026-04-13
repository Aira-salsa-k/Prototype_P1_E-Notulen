import {
  Card as HeroCard,
  CardBody,
  CardHeader,
  CardProps as HeroCardProps,
} from "@heroui/card";
import { cn } from "@/lib/utils";

interface AppCardProps extends Omit<HeroCardProps, "title"> {
  title?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  noPadding?: boolean;
}

export const AppCard = ({
  title,
  action,
  children,
  className,
  noPadding = false,
  ...props
}: AppCardProps) => {
  return (
    <HeroCard
      className={cn("border border-gray-200 shadow-sm", className)}
      {...props}
    >
      {(title || action) && (
        <CardHeader className="flex justify-between items-center p-6 pb-2">
          {typeof title === "string" ? (
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          ) : (
            title
          )}
          {action && <div>{action}</div>}
        </CardHeader>
      )}
      <CardBody className={cn(noPadding ? "p-0" : "p-6", "pt-2")}>
        {children}
      </CardBody>
    </HeroCard>
  );
};
