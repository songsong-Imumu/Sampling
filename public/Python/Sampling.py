from GraphSampling.BFS import BFS
from GraphSampling.TIES import TIES
import scipy.io as scio
import json
def Do_BFS(path):
    data = scio.loadmat(path)
    matrix = data['A'].toarray()
    node = data['local_info'].tolist()
    edge_num = 0
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if matrix[i][j] == 1.0:
                edge_num += 1
    # 创建Graph
    node_list = [item for item in range(len(node))]
    edge_list = [(i, j) for j in range(len(matrix)) for i in range(len(matrix)) if matrix[i][j] == 1.0]
    model = BFS(node_list,edge_list)
    # 采样率
    rate = 0.10
    G = model.bfs(len(node)*rate)
    node_property = [node[G['nodes'][i]] for i in range(len(G['nodes']))]
    with open('../../src/data/SampledGraph/American75_BFS.json','w') as f:
        json.dump(G,f)
    # with open('../../src/data/SampledNode_Property/SampledNode_Property_Bowdoin47.json','w') as f:
    #     json.dump(node_property,f)
    for i in node_property:
        if i[1] != 0 and i[1] != 1 and i[1] != 2:
            print(i[1],i)
    origin_sex_1 = [item[1] for item in node if item[1] == 1]
    origin_sex_2 = [item[1] for item in node if item[1] == 2]
    sample_sex_1 = [item[1] for item in node_property if item[1] == 1]
    sample_sex_2 = [item[1] for item in node_property if item[1] == 2]
    print('---'+str(int(rate*100))+'%---')
    print('origin',len(origin_sex_1)/len(origin_sex_2))
    print('sample',len(sample_sex_1)/len(sample_sex_2))
def Do_TIES(path):
    data = scio.loadmat(path)
    matrix = data['A'].toarray()
    node = data['local_info'].tolist()
    edge_num = 0
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if matrix[i][j] == 1.0:
                edge_num += 1
    # 创建Graph
    node_list = [item for item in range(len(node))]
    edge_list = [(i, j) for j in range(len(matrix)) for i in range(len(matrix)) if matrix[i][j] == 1.0]
    model = TIES(node_list,edge_list)
    # 采样率
    rate = 0.50
    G = model.ties(len(node) * rate)
    node_property = [node[G['nodes'][i]] for i in range(len(G['nodes']))]
    # print(len(node))
    # print(len(G['nodes']),len(G['edges']))
    with open('../../src/data/SampledGraph/American75_TIES.json', 'w') as f:
        json.dump(G, f)
    # with open('../../src/data/SampledNode_Property/SampledNode_Property_Bowdoin47.json', 'w') as f:
    #     json.dump(node_property, f)
    # 测试  指标的比例
    origin_sex_1 = [item[1] for item in node if item[1] == 1]
    origin_sex_2 = [item[1] for item in node if item[1] == 2]
    sample_sex_1 = [item[1] for item in node_property if item[1] == 1]
    sample_sex_2 = [item[1] for item in node_property if item[1] == 2]
    print('---' + str(int(rate * 100)) + '%---')
    print('origin', len(origin_sex_1) / len(origin_sex_2))
    print('sample', len(sample_sex_1) / len(sample_sex_2))
if __name__ == '__main__':
    path = '../data/Facebook/facebook100/American75.mat'
    Do_BFS(path)
    # Do_TIES(path)