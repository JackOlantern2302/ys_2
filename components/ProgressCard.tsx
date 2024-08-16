'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatIDR } from '@/lib/utils';

interface Props {
  title: string;
  amount: number;
  content: string;
  progress: number;
}

export default function ProgressCard({
  title,
  amount,
  content,
  progress,
}: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{formatIDR.format(amount)}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{content}</div>
      </CardContent>
      <CardFooter>
        <Progress value={progress} aria-label={content} />
      </CardFooter>
    </Card>
  );
}
