import { Card, CardContent, CardFooter, CardHeader, CardDescription, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { GithubReturn } from '@/utils/githubUser.interface'
import { Blocks, Boxes, Code, PackagePlus, TrendingUp } from 'lucide-react'
import React from 'react'
import { CardBody, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Label, Pie, PieChart } from "recharts"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

interface chartProps {
  title: string;
  month: string;
  data: string
  dataCharts: any;
  percent: number
  description: string
}

interface OptionsProps {
  name: string;
  icon: React.ReactElement;
  route: string;
  disabled: boolean
}


function Dashboard() {
  const [userData, setUserData] = React.useState<GithubReturn>()
  const [DashboardOptions] = React.useState<OptionsProps[]>([
    {
      name: "Novo Projeto",
      icon: <PackagePlus size={50} strokeWidth={1} />,
      route: "/admin/projects/new",
      disabled: false
    },
    {
      name: "Lista de Projetos",
      icon: <Boxes size={50} strokeWidth={1}/>,
      route: "/admin/projects",
      disabled: false
    },
    {
      name: "Experiências",
      icon: <Code size={50} strokeWidth={1}/>,
      route: "/admin/experiences",
      disabled: false
    },
    {
      name: "Serviços",
      icon: <Blocks size={50} strokeWidth={1}/>,
      route: "/admin/services",
      disabled: false
    }
  ])

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  React.useEffect(() => {
    function checkUser() {
      const GithubUser = localStorage.getItem('githubUser')
      if (GithubUser !== null) {
        setUserData(JSON.parse(GithubUser))
      }
    }

    checkUser()
  }, [])

  function CardChart({ title, dataCharts, description, month, percent, data }: chartProps) {
    return (
      <Card className="flex flex-col border-[0.5px] rounded-lg">
        <CardHeader className="items-center pb-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{month} - {data}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={dataCharts}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Visitors
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by {percent}% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            {description}
          </div>
        </CardFooter>
      </Card>
    )
  }

  function OptionsCard({ name, icon, route, disabled }: OptionsProps) {
    return (
      <Card aria-disabled={disabled} className={disabled ? "opacity-15 transition-all w-[10rem] select-none cursor-pointer" : 'transition-all hover:scale-90 w-[10rem]'}>
        <Link to={disabled ? '#' : route} className='flex flex-col justify-center items-center'>
          <CardHeader>
            {icon}
          </CardHeader>
          <CardBody className='text-center'>
            <CardDescription className='my-3 w-[7rem]'>
              {name}
            </CardDescription>
          </CardBody>
        </Link>
      </Card>
    )
  }

  return (
    <Container >      
      <section>
        <article className='mt-3 lg:m-5'>
          <h1 className='text-xl animate__animated animate__fadeIn animate__slower'> Olá! {userData?.displayName}</h1>
          <hr className='my-2 w-[15rem] animate__animated animate__fadeIn animate__slower' />
        </article>
        <article className='m-5 animate__animated animate__fadeIn animate__slower'>
          <h1 className='text-lg'> Aqui está um resumo do seus projetos </h1>

          <div className='flex flex-row flex-wrap mt-3 gap-5'>
            {Array.from({ length: 3 }).map((_, index) => (
              <CardChart title='Projetos' dataCharts={chartData} data={"Março"} month={"Janeiro"} description={"Teste"} percent={5} key={index} />
            ))}
          </div>

          <h1 className='text-lg mt-3'> Acesso Rápido </h1>
          <div className='flex flex-row flex-wrap mt-3 gap-3'>
            {DashboardOptions.map((i, index) => (
              <OptionsCard
                key={index}
                name={i.name}
                icon={i.icon}
                route={i.route}
                disabled={i.disabled}/>
            ))}
          </div>
        </article>
      </section>
    </Container>
  )
}

export default Dashboard