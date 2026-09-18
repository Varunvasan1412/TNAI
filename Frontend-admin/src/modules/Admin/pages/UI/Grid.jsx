import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  TableContainer, 
  THead, 
  TBody, 
  TR, 
  TH, 
  TD,
  Badge
} from '../../../../components/ui';

const Grid = () => {
    return (
        <div className="space-y-6">
            <PageTitle 
                title="Grid System" 
                breadcrumbs={[
                    { label: 'Components', path: '#' },
                    { label: 'Grid', active: true },
                ]} 
            />

            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader>
                    <CardTitle>Tailwind Grid Options</CardTitle>
                    <p className="text-xs text-gray-500 font-medium">Responsive grid behavior across multiple breakpoints using Tailwind's utility-first approach.</p>
                </CardHeader>
                <CardBody className="p-0">
                    <TableContainer className="rounded-none border-0 shadow-none">
                        <THead className="bg-gray-50/50 dark:bg-slate-800/50">
                            <TR>
                                <TH></TH>
                                <TH className="text-center font-bold">XS<br/><span className="text-[10px] font-medium opacity-60">&lt;640px</span></TH>
                                <TH className="text-center font-bold">SM<br/><span className="text-[10px] font-medium opacity-60">≥640px</span></TH>
                                <TH className="text-center font-bold">MD<br/><span className="text-[10px] font-medium opacity-60">≥768px</span></TH>
                                <TH className="text-center font-bold">LG<br/><span className="text-[10px] font-medium opacity-60">≥1024px</span></TH>
                                <TH className="text-center font-bold">XL<br/><span className="text-[10px] font-medium opacity-60">≥1280px</span></TH>
                                <TH className="text-center font-bold">2XL<br/><span className="text-[10px] font-medium opacity-60">≥1536px</span></TH>
                            </TR>
                        </THead>
                        <TBody>
                            <TR>
                                <TH className="whitespace-nowrap font-bold text-gray-700 dark:text-slate-300">Container Width</TH>
                                <TD className="text-center text-gray-500">None (100%)</TD>
                                <TD className="text-center text-gray-500">640px</TD>
                                <TD className="text-center text-gray-500">768px</TD>
                                <TD className="text-center text-gray-500">1024px</TD>
                                <TD className="text-center text-gray-500">1280px</TD>
                                <TD className="text-center text-gray-500">1536px</TD>
                            </TR>
                            <TR>
                                <TH className="whitespace-nowrap font-bold text-gray-700 dark:text-slate-300">Class Prefix</TH>
                                <TD className="text-center"><Badge variant="soft-primary">grid-cols-1</Badge></TD>
                                <TD className="text-center"><Badge variant="soft-primary">sm:grid-cols-2</Badge></TD>
                                <TD className="text-center"><Badge variant="soft-primary">md:grid-cols-3</Badge></TD>
                                <TD className="text-center"><Badge variant="soft-primary">lg:grid-cols-4</Badge></TD>
                                <TD className="text-center"><Badge variant="soft-primary">xl:grid-cols-6</Badge></TD>
                                <TD className="text-center"><Badge variant="soft-primary">2xl:grid-cols-12</Badge></TD>
                            </TR>
                        </TBody>
                    </TableContainer>
                </CardBody>
            </Card>

            <Card className="border-0 shadow-sm">
                <CardHeader>
                    <CardTitle>Interactive Grid Structure</CardTitle>
                    <p className="text-xs text-gray-500 font-medium">Demonstration of flexible grid layouts using the `grid` and `grid-cols` utilities.</p>
                </CardHeader>
                <CardBody className="space-y-4">
                    <GridRow label="grid-cols-12" cols="grid-cols-12" count={12} />
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-11 p-3 bg-primary/10 border border-primary/20 rounded-xl text-center text-xs font-bold text-primary">col-span-11</div>
                        <div className="col-span-1 p-3 bg-primary/10 border border-primary/20 rounded-xl text-center text-xs font-bold text-primary">1</div>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-10 p-3 bg-primary/10 border border-primary/20 rounded-xl text-center text-xs font-bold text-primary">col-span-10</div>
                        <div className="col-span-2 p-3 bg-primary/10 border border-primary/20 rounded-xl text-center text-xs font-bold text-primary">2</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 bg-info/10 border border-info/20 rounded-xl text-center text-xs font-bold text-info uppercase tracking-widest">1/3</div>
                        <div className="p-3 bg-info/10 border border-info/20 rounded-xl text-center text-xs font-bold text-info uppercase tracking-widest">1/3</div>
                        <div className="p-3 bg-info/10 border border-info/20 rounded-xl text-center text-xs font-bold text-info uppercase tracking-widest">1/3</div>
                    </div>
                </CardBody>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle>Vertical Alignment</CardTitle></CardHeader>
                    <CardBody className="space-y-6">
                        <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 min-h-[160px] flex items-center justify-center gap-4">
                           <div className="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm font-bold text-xs">Centered</div>
                           <div className="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm font-bold text-xs">Items</div>
                        </div>
                    </CardBody>
                </Card>

                <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle>Spacing & Gaps</CardTitle></CardHeader>
                    <CardBody>
                        <div className="grid grid-cols-2 gap-8 bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4">
                           <div className="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm font-bold text-xs text-center">Gap 8</div>
                           <div className="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm font-bold text-xs text-center">Gap 8</div>
                           <div className="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm font-bold text-xs text-center">Gap 8</div>
                           <div className="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm font-bold text-xs text-center">Gap 8</div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

const GridRow = ({ label, cols, count }) => (
    <div className={`grid ${cols} gap-4`}>
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="p-3 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-center text-[10px] font-bold text-gray-500 uppercase tracking-tighter truncate">
                {count === 12 ? '1' : label}
            </div>
        ))}
    </div>
);

export default Grid;
