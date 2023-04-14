export interface HierarchyTree{
    cost:number;
    description:string;
    filters?:string;
    left_child?:HierarchyTree;
    right_child?:HierarchyTree;
    explanation?:string;
}