from graphviz import Digraph
import matplotlib.pyplot as plt

def test_graphviz_basic():
    dot = Digraph('name1')
    dot.node('A', 'Start')
    dot.node('B', 'Process')
    dot.node('C', 'End')
    dot.edge('A', 'B')
    dot.edge('B', 'C')
    dot.render('test_graphviz', format='png')
    
    # 创建一个有向图
    dot = Digraph('name2')

    # 添加节点
    dot.node('A', '开始')
    dot.node('B', '步骤1')
    dot.node('C', '步骤2')
    dot.node('D', '结束')

    # 添加边
    dot.edge('A', 'B')
    dot.edge('B', 'C')
    dot.edge('C', 'D')

    # 渲染并显示流程图
    dot.render('flowchart', view=True)


if __name__ == '__main__':
    if 1:
        test_graphviz_basic()
        plt.show()