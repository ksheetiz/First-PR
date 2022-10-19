#!/usr/bin/env python
# coding: utf-8


import pandas as pd                                                                        
import numpy as np 
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler                       
from sklearn.model_selection import train_test_split                    
from sklearn.metrics import confusion_matrix                           
from sklearn.metrics import accuracy_score           
from sklearn.ensemble import RandomForestClassifier


# In[ ]:





# In[2]:


dataset = pd.read_csv('winequality-red.csv')                           
dataset.head()                                                      


# In[3]:


print(dataset.info())


# In[ ]:





# In[4]:


plt.title('Data Visualization')
sns.countplot(dataset['quality'])                       


# In[ ]:





# In[5]:


# Missing values check
print(dataset.isna().sum())  


# In[ ]:





# In[6]:


# Prepairing dataset
X = dataset.iloc[:, 0:-1].values                                       
y = dataset.iloc[:, -1].values                                         


# In[ ]:





# In[7]:


print(X)


# In[8]:


print(y)


# In[ ]:





# In[9]:


# Splitting Dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.30)


# In[10]:


# Scaling Data

SS = StandardScaler()                                                
X_train = SS.fit_transform(X_train) 
X_test = SS.transform(X_test) 


# In[ ]:





# In[11]:


model = RandomForestClassifier(random_state=1)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
accuracy_score(y_test, y_pred)


# In[ ]:





# In[12]:


cm = confusion_matrix(y_test, y_pred)  
print(cm)


# In[ ]:





# In[ ]:




