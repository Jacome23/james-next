"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import CustomTable from "@/components/custom-table" 
import { ChevronDown, ChevronRight, UsersRound } from "lucide-react"
import { useEffect, useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { CustomSelect } from "@/components/select-component"

import NumberInput from "@/components/custom-input"

export default function Resourcing(){

  const [filterableValue, setFilterableValue] = useState<string[]>([])

  type optionTypes = {
    value: string,
    label: string
  }

  const selectOptions: optionTypes[] = [  
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "au", label: "Australia" },
    { value: "br", label: "Brazil" },
    { value: "in", label: "India" },
    { value: "cn", label: "China" }
  ]

  type materialPropTypes = {
    catalog: string,
    category: string,
    partNumber: string,
    uom: string,
    cost: number,
    saleAmount: number,
    quantity:number,
    total: string
  }

  type commonPropTypes = {
    name: string,
    cost: number,
    saleAmount: number,
    quantity: number,
    total: string
  }

  const materials: materialPropTypes[] = [
    {
      catalog: 'A stick',
      category: 'Sticky',
      partNumber: '10122',
      uom: 'rods',
      cost: 100,
      saleAmount: 120,
      quantity: 10,
      total: `$${120*10}`
    }
  ]

  const people: commonPropTypes[] = [
    {
      name: 'James Nunieza',
      cost: 100,
      saleAmount: 120,
      quantity: 10,
      total: `$${120*10}`
    }
  ]

  const contractors: commonPropTypes[] = [
    {
      name: 'Belobog Industries',
      cost: 100,
      saleAmount: 1,
      quantity: 10,
      total: `$${120*10}`
    }
  ]

  type contentTypes = {
    state: boolean,
    name: string,
    key: string,
    materials: materialPropTypes[],
    people: commonPropTypes[],
    contractors:commonPropTypes[]
  }

  const [content, setContent] = useState<contentTypes[]>([])

  useEffect(() => {
    setContent(tempRows)
  }, []);

  const tempRows: contentTypes[] = Array.from({ length: 100 }, (_, index) => ({
    state: false,
    name: `Template ${index}`,
    key: `tk-${index}`,
    materials:structuredClone(materials),
    people: structuredClone(people),
    contractors: structuredClone(contractors)
  }));

  const handleDropDown = (index:number) => {
    const updated = content.map((item, i) =>
      i === index ? { ...item, state: !item.state } : item
    );
    setContent(updated)
  }

  const handleNestedChange = (
    rowIndex: number,
    type: 'materials' | 'people' | 'contractors',
    itemIndex: number,
    field: 'cost' | 'saleAmount' | 'quantity',
    value: number
  ) => {

    setContent(prev => {
      const updated = [...prev];
      const row = { ...updated[rowIndex] };

      const nested = [...row[type]]

      const item = {...nested[itemIndex]}

      // Update field
      item[field] = value;

      // Recalculate total
      item.total = ( item.saleAmount * item.quantity).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });;

      nested[itemIndex] = item;
      row[type] = nested as any;
      updated[rowIndex] = row;
      
      return updated;
    });
  };



  return (<>
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center">
        <UsersRound className="h-[3vh]"/>
        <h1 className="text-[3vh] font-bold tracking-tight ml-3">
          A Simple Table (Not Really)
        </h1>
      </div>
      <div className="flex items-center">
        <CustomSelect
          options={selectOptions}
          value={filterableValue}
          onValueChange={(value) => setFilterableValue(value as string[])}
          placeholder="Search Select..."
          multiple
          filterable
        ></CustomSelect>
      </div>
      <Tabs defaultValue="resources" className="w-full">
        <TabsList>
          <TabsTrigger value="resources">Version 1</TabsTrigger>
          <TabsTrigger value="timesheet">Version 2</TabsTrigger>
        </TabsList>
        <TabsContent value="resources">
          <div className="flex items-center bg-muted/50 px-4 py-2 text-sm font-medium">
            <div className="w-10" />
            <div>This is currently in Development. It's just a table I designed. I hope you like it.</div>
          </div>
          <ScrollArea className="h-[60vh]">
            <div className="min-w-[1000px]">
              <Table className="w-full">
                <TableBody>
                  {content.map((row,index)=>{
                    return (<>
                      <TableRow
                        key={`${row.key}`}
                      >
                        <TableCell className="w-12">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              handleDropDown(index)
                            }}
                          >
                            {row.state ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="font-bold">
                            {row.name}
                          </div>
                        </TableCell>
                      </TableRow>
                      { 
                        row.state && 
                        <TableRow key={`${row.name}-child-${index}`}>
                          <TableCell></TableCell>
                          <TableCell>
                            <div className="text-2xs font-bold">Materials</div>
                            <Table className="w-full">
                              <TableBody>
                                <TableRow key={`mch-${index}`}>
                                  <TableCell className="text-[14px] w-[10rem]">Catalog</TableCell>
                                  <TableCell className="text-[14px] w-[10rem]">Category</TableCell>
                                  <TableCell className="text-[14px] w-[10rem]">Part Number</TableCell>
                                  <TableCell className="text-[14px] w-[10rem]">Uom</TableCell>
                                  <TableCell className="text-[14px]">Cost</TableCell>
                                  <TableCell className="text-[14px]">Sale Amount</TableCell>
                                  <TableCell className="text-[14px]">Quantity</TableCell>
                                  <TableCell className="text-[14px]">Total</TableCell>
                                </TableRow>
                                {
                                  row.materials.map((mRow,mIndex) =>{
                                    return (<>
                                      <TableRow
                                        key={`mch-${index}-${mIndex}`}
                                      >
                                        <TableCell className="text-[14px] w-[9rem]">{mRow.catalog}</TableCell>
                                        <TableCell className="text-[14px] w-[9rem]">{mRow.category}</TableCell>
                                        <TableCell className="text-[14px] w-[9rem]">{mRow.partNumber}</TableCell>
                                        <TableCell className="text-[14px] w-[9rem]">{mRow.uom}</TableCell>
                                        <TableCell className="text-[14px]">
                                          <NumberInput className="w-[9rem] h-[2rem]" 
                                            onChange={(val) =>
                                              handleNestedChange(index, 'materials', mIndex, 'cost', Number(val))
                                            }
                                            value={mRow.cost}></NumberInput>
                                        </TableCell>
                                        <TableCell className="text-[14px]">
                                          <NumberInput
                                            logo={true}
                                            onChange={(val) =>
                                              handleNestedChange(index, 'materials', mIndex, 'saleAmount', Number(val))
                                            } 
                                            className = "w-[9rem] h-[2rem]" 
                                            value={mRow.saleAmount}/>
                                        </TableCell>
                                        <TableCell className="text-[14px]">
                                          <NumberInput 
                                            className="w-[9rem] h-[2rem]"
                                            logo={false}
                                            onChange={(val) =>
                                              handleNestedChange(index, 'materials', mIndex, 'quantity', Number(val))
                                            } 
                                            value={mRow.quantity}/>
                                        </TableCell>
                                        <TableCell className="text-[14px]">
                                          {mRow.total}
                                        </TableCell>
                                      </TableRow>
                                    </>)
                                  })
                                }
                              </TableBody>
                            </Table>
                            <div className="text-2xs font-bold">People</div>
                            <Table className="w-full">
                              <TableBody>
                                <TableRow key={`pch-${index}`}>
                                  <TableCell className="text-[14px] w-[40rem]">Name</TableCell>
                                  <TableCell className="text-[14px]">Cost</TableCell>
                                  <TableCell className="text-[14px]">Sale Amount</TableCell>
                                  <TableCell className="text-[14px]">Quantity</TableCell>
                                  <TableCell className="text-[14px]">Total</TableCell>
                                </TableRow>
                                {
                                  row.people.map((pRow,pIndex) =>{
                                    return (<>
                                      <TableRow
                                        key={`pch-${index}-${pIndex}`}
                                      >
                                        <TableCell className="text-[14px] w-[40rem]">{pRow.name}</TableCell>
                                        <TableCell className="text-[14px]">
                                          <NumberInput 
                                            className="w-[9rem] h-[2rem]" 
                                            onChange={(val) =>
                                              handleNestedChange(index, 'people', pIndex, 'cost', Number(val))
                                            } 
                                            value={pRow.cost}></NumberInput>
                                        </TableCell>
                                        <TableCell className="text-[14px]">
                                          <NumberInput 
                                            className = "w-[9rem] h-[2rem]" 
                                            onChange={(val) =>
                                              handleNestedChange(index, 'people', pIndex, 'saleAmount', Number(val))
                                            } 
                                            value={pRow.saleAmount}></NumberInput>
                                        </TableCell>
                                        <TableCell className="text-[14px]">
                                          <NumberInput 
                                            className="w-[9rem] h-[2rem]" 
                                            logo={false}
                                            onChange={(val) =>
                                              handleNestedChange(index, 'people', pIndex, 'quantity', Number(val))
                                            } 
                                            value={pRow.quantity}></NumberInput>
                                        </TableCell>
                                        <TableCell className="text-[14px]">
                                          {pRow.total}
                                        </TableCell>
                                      </TableRow>
                                    </>)
                                  })
                                }
                              </TableBody>
                            </Table>
                            <div className="text-2xs font-bold">Contractors</div>
                            <Table>
                              <TableBody>
                                <TableRow key={`cch-${index}`}>
                                  <TableCell className="text-[14px] w-[40rem]">Name</TableCell>
                                  <TableCell className="text-[14px]">Cost</TableCell>
                                  <TableCell className="text-[14px]">Sale Amount</TableCell>
                                  <TableCell className="text-[14px]">Quantity</TableCell>
                                  <TableCell className="text-[14px]">Total</TableCell>
                                </TableRow>
                                {
                                  row.contractors.map((cRow,cIndex) =>{
                                    return (<>
                                      <TableRow
                                        key={`cch-${index}-${cIndex}`}
                                      >
                                        <TableCell className="text-[14px] w-[40rem]">{cRow.name}</TableCell>
                                        <TableCell className="text-[14px]">
                                          <NumberInput 
                                            className="w-[9rem] h-[2rem]" 
                                            onChange={(val) =>
                                              handleNestedChange(index, 'contractors', cIndex, 'cost', Number(val))
                                            } 
                                            value={cRow.cost}></NumberInput>
                                        </TableCell>
                                        <TableCell className="text-[14px]">
                                          <NumberInput 
                                            className = "w-[9rem] h-[2rem]" 
                                            onChange={(val) =>
                                              handleNestedChange(index, 'contractors', cIndex, 'saleAmount', Number(val))
                                            } 
                                            value={cRow.saleAmount}></NumberInput>
                                        </TableCell>
                                        <TableCell className="text-[14px]">
                                          <NumberInput 
                                            className="w-[9rem] h-[2rem]"
                                            logo={false} 
                                            onChange={(val) =>
                                              handleNestedChange(index, 'contractors', cIndex, 'quantity', Number(val))
                                            } 
                                            value={cRow.quantity}></NumberInput>
                                        </TableCell>
                                        <TableCell className="text-[14px]">
                                          {cRow.total}
                                        </TableCell>
                                      </TableRow>
                                    </>)
                                  })
                                }
                              </TableBody>
                            </Table>
                          </TableCell>
                        </TableRow>
                      }
                    </>)
                  })}
                </TableBody>
              </Table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="flex items-center bg-muted/50 px-4 py-2 text-sm font-medium">
            <div className="w-10" />
            <div>Total</div>
          </div>
        </TabsContent>
        <TabsContent value="timesheet">
          <div className="flex items-center bg-muted/50 px-4 py-2 text-sm font-medium">
            <div className="w-10" />
            <div>I made a case for this</div>
          </div>
          <ScrollArea className="h-[60vh]">
            <div className="min-w-[1000px]">
              <Table className="w-full">
                <TableBody>
                  {content.map((row,index)=>{
                    return (<>
                      <TableRow
                        key={`v2-${row.key}`}
                      >
                        <TableCell className="w-12">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 flex-none"
                              onClick={() => {
                                handleDropDown(index)
                              }}
                            >
                              {row.state ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>                          
                        </TableCell>
                        <TableCell>
                          <div className="flex">
                            <div className="font-bold flex-none">
                              {row.name}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                      { row.state &&
                        <TableRow key={`v2-child-${row.key}`}>
                          <TableCell></TableCell>
                          <TableCell>
                            <Tabs defaultValue="materials">
                              <TabsList>
                                <TabsTrigger value="materials">Materials</TabsTrigger>
                                <TabsTrigger value="people">People</TabsTrigger>
                                <TabsTrigger value="contractors">Contractors</TabsTrigger>
                              </TabsList>
                              <TabsContent value="materials">
                                <Table className="w-full">
                                  <TableBody>
                                    <TableRow key={`v2m-${row.key}`}>
                                      <TableCell className="text-[14px] w-[10rem]">Catalog</TableCell>
                                      <TableCell className="text-[14px] w-[10rem]">Category</TableCell>
                                      <TableCell className="text-[14px] w-[10rem]">Part Number</TableCell>
                                      <TableCell className="text-[14px] w-[10rem]">UoM</TableCell>
                                      <TableCell className="text-[14px]">Cost</TableCell>
                                      <TableCell className="text-[14px]">Sale Amount</TableCell>
                                      <TableCell className="text-[14px]">Quantity</TableCell>
                                      <TableCell className="text-[14px]">Total</TableCell>
                                    </TableRow>
                                  {
                                    row.materials.map((mRow,mIndex) =>{
                                      return (<>
                                        <TableRow
                                          key={`v2-mch-${index}-${mIndex}`}
                                        >
                                          <TableCell className="text-[14px] w-[9rem]">{mRow.catalog}</TableCell>
                                          <TableCell className="text-[14px] w-[9rem]">{mRow.category}</TableCell>
                                          <TableCell className="text-[14px] w-[9rem]">{mRow.partNumber}</TableCell>
                                          <TableCell className="text-[14px] w-[9rem]">{mRow.uom}</TableCell>
                                          <TableCell className="text-[14px]">
                                            <NumberInput 
                                              className="w-[9rem] h-[2rem]" 
                                              value={mRow.cost}
                                              onChange={(val) =>
                                                handleNestedChange(index, 'materials', mIndex, 'cost', Number(val))
                                              }
                                              />
                                          </TableCell>
                                          <TableCell className="text-[14px]">
                                            <NumberInput 
                                              className = "w-[9rem] h-[2rem]" 
                                              onChange={(val) =>
                                                handleNestedChange(index, 'materials', mIndex, 'saleAmount', Number(val))
                                              }
                                              value={mRow.saleAmount}/>
                                          </TableCell>
                                          <TableCell className="text-[14px]">
                                            <NumberInput 
                                              className="w-[9rem] h-[2rem]"
                                              logo={false} 
                                              onChange={(val) =>
                                                handleNestedChange(index, 'materials', mIndex, 'quantity', Number(val))
                                              }
                                              value={mRow.quantity}/>
                                          </TableCell>
                                          <TableCell className="text-[14px]">
                                            {mRow.total}
                                          </TableCell>
                                        </TableRow>
                                      </>)
                                    })
                                  }
                                  </TableBody>
                                </Table>
                              </TabsContent>
                              <TabsContent value="people">
                                <Table className="w-full">
                                  <TableBody>
                                    <TableRow key={`v2p-${row.key}`}>
                                      <TableCell className="text-[14px] w-[40rem]">Name</TableCell>
                                      <TableCell className="text-[14px]">Cost</TableCell>
                                      <TableCell className="text-[14px]">Sale Amount</TableCell>
                                      <TableCell className="text-[14px]">Quantity</TableCell>
                                      <TableCell className="text-[14px]">Total</TableCell>
                                    </TableRow>
                                    {
                                      row.people.map((pRow,pIndex) =>{
                                        return (<>
                                          <TableRow
                                            key={`p2ch-${index}-${pIndex}`}
                                          >
                                            <TableCell className="text-[14px] w-[40rem]">{pRow.name}</TableCell>
                                            <TableCell className="text-[14px]">
                                              <NumberInput 
                                                onChange={(val) =>
                                                  handleNestedChange(index, 'people', pIndex, 'cost', Number(val))
                                                } 
                                                className="w-[9rem] h-[2rem]" 
                                                value={pRow.cost}/>
                                            </TableCell>
                                            <TableCell className="text-[14px]">
                                              <NumberInput 
                                                className = "w-[9rem] h-[2rem]"
                                                onChange={(val) =>
                                                  handleNestedChange(index, 'people', pIndex, 'cost', Number(val))
                                                }  
                                                value={pRow.saleAmount}/>
                                            </TableCell>
                                            <TableCell className="text-[14px]">
                                              <NumberInput 
                                                className="w-[9rem] h-[2rem]"
                                                logo={false}
                                                onChange={(val) =>
                                                  handleNestedChange(index, 'people', pIndex, 'quantity', Number(val))
                                                }  
                                                value={pRow.quantity}></NumberInput>
                                            </TableCell>
                                            <TableCell className="text-[14px]">
                                              {pRow.total}
                                            </TableCell>
                                          </TableRow>
                                        </>)
                                      })
                                    }
                                  </TableBody>
                                </Table>
                              </TabsContent>
                              <TabsContent value="contractors">
                                <Table>
                                  <TableBody>
                                    <TableRow key={`v2c-${row.key}`}>
                                      <TableCell className="text-[14px] w-[40rem]">Name</TableCell>
                                      <TableCell className="text-[14px]">Cost</TableCell>
                                      <TableCell className="text-[14px]">Sale Amount</TableCell>
                                      <TableCell className="text-[14px]">Quantity</TableCell>
                                      <TableCell className="text-[14px]">Total</TableCell>
                                    </TableRow>
                                    {
                                      row.contractors.map((cRow,cIndex) =>{
                                        return (<>
                                          <TableRow
                                            key={`c2ch-${index}-${cIndex}`}
                                          >
                                            <TableCell className="text-[14px] w-[40rem]">{cRow.name}</TableCell>
                                            <TableCell className="text-[14px]">
                                              <NumberInput className="w-[9rem] h-[2rem]" value={cRow.cost}></NumberInput>
                                            </TableCell>
                                            <TableCell className="text-[14px]">
                                              <NumberInput className = "w-[9rem] h-[2rem]" value={cRow.saleAmount}></NumberInput>
                                            </TableCell>
                                            <TableCell className="text-[14px]">
                                              <NumberInput className="w-[9rem] h-[2rem]" value={cRow.quantity}></NumberInput>
                                            </TableCell>
                                            <TableCell className="text-[14px]">
                                              {cRow.total}
                                            </TableCell>
                                          </TableRow>
                                        </>)
                                      })
                                    }
                                  </TableBody>
                                </Table>
                              </TabsContent>
                            </Tabs>
                          </TableCell>
                        </TableRow>
                      }
                    </>)
                  })}
                </TableBody>
              </Table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="flex items-center bg-muted/50 px-4 py-2 text-sm font-medium">
            <div className="w-10" />
            <div>Total</div>
          </div>
        </TabsContent>
      </Tabs>  
    </div>  
  </>)
}