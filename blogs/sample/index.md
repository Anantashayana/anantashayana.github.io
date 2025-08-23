---
title: Kubernetes CKAD Exam Cheatsheet & Tips
date: 2025-01-05 12:28:00
author: Anantashayana
tags: ['kubernetes', 'ckad', 'cheatsheet', 'tips']
---

# Kubernetes CKAD Exam: Cheatsheet & Tips 🎓

Hello, Kubernetes enthusiasts! 🚀  
I recently completed my **CKAD (Certified Kubernetes Application Developer)** exam, and I’m here to share my **cheatsheet** and some **tips** that helped me during my preparation. If you're preparing for the exam or looking for a handy Kubernetes reference, this post is for you!

---

## Tips for Success 📌
1. **Practice, Practice, Practice:** Use Kubernetes playgrounds like [Katacoda](https://katacoda.com) or [Play with Kubernetes](https://labs.play-with-k8s.com).
2. **Master VIM:** Learn shortcuts for quick YAML editing.
3. **Time Management:** Practice completing tasks under time pressure.
4. **CKAD Curriculum Focus:** Prioritize `Workloads`, `Services`, `Config`, `Storage`, and `Troubleshooting`.

---

## Cheatsheet 📖

## VIM Commands ✍️

- **Indent Multiple Lines:**
  1. Set the shift width: `:set shiftwidth=2`
  2. Mark multiple lines using `Shift + v` and the up/down keys.
  3. Indent the marked lines: `>` or `<`.
  4. Repeat the action: `.`

---

## Pods 🛠️

- Create a Pod YAML:
  `kubectl run <pod-name> --image=<image-name> --dry-run=client --restart=Never -o yaml > pod.yaml`

- Get Pods with Labels:
  `kubectl get pods --show-labels`

- Curl from a Temp Pod:
  `kubectl run tmp --restart=Never --rm --image=nginx:alpine -i -- curl http://<service-name>:<port>`

- View Logs:
  - Current logs: `kubectl logs <pod-name>`
  - Previous logs: `kubectl logs <pod-name> --previous`

- Set Image for a Pod:
  `kubectl set image pod/<pod-name> <container-name>=<image-name>:<tag>`

- Force Delete Pod:
  `kubectl delete pod <pod-name> --force --grace-period=0`

---

## Deployments 🚀

- Update Deployment Image:
  `kubectl set image deployment/<deployment-name> <container-name>=<image-name>:<tag>`

- Set Service Account for Deployment:
  `kubectl set serviceaccount deployment <deployment-name> <service-account-name> -n <namespace>`

- Autoscale Deployment:
  `kubectl autoscale deployment <deployment-name> --cpu-percent=<target-percentage> --min=<min-pods> --max=<max-pods>`

---

## Services 🛡️

- Expose Pod or Deployment:
  `kubectl expose pod <pod-name> --type=ClusterIP --name=<service-name> --port=<service-port> --target-port=<container-port>`
  
  `kubectl expose pod <pod-name> --type=NodePort --name=<service-name> --port=<service-port> --target-port=<container-port> --node-port=<node-port>`

- Check Endpoints:
  `kubectl get endpoints <service-name>`

---

## Persistent Volumes (PV) and Persistent Volume Claims (PVC) 💾

- Check PV and PVC Binding:
  `kubectl -n <namespace> get pv,pvc`

- Inspect Mount Points:
  `kubectl -n <namespace> describe pod <pod-name> | grep -A2 Mounts`

---

## Jobs 🎯

- Create a Job:
  `kubectl create job <job-name> --image=<image-name>`
 
- Add Completions and Parallelism:
  ```yaml
  spec:
    completions: 3
    parallelism: 2


# ConfigMap
k -n moon create configmap configmap-web-moon-html --from-file=index.html=/opt/course/15/web-moon.html 
- important to set the index.html key
  volumes:
  - name: config-volume
    configMap:
      name: another-config

- verify
kubectl exec pod1 -- printenv | grep DB_




# Secret
kubectl create secret generic <secret-name> --from-literal=<key>=<value> --from-literal=<key2>=<value2> -n <namespace>
- If a Secret belongs to a ServiceAccont, it'll have the annotation kubernetes.io/service-account.name
k -n neptune get secret neptune-secret-1 -o yaml  -> gives base64 encoded token 
- To get base 64 decoded | base64 -d    or k sescribe secret

k create secret generic my-secret $ns --type="kubernetes.io/ssh-auth" --from-file=ssh-privatekey=id_rsa $do > sc.yaml

env:
- name: SECRET1_USER                # add
  valueFrom:                      # add
    secretKeyRef:                 # add
      name: secret1               # add
      key: user                   # add
volumes:
  - name: secret2-volume              # add
    secret:                           # add
      secretName: secret2             # add

volumes: 
- name: config-volume 
  configMap: 
  name: my-config

    envFrom:
    - secretRef:  No KEY       # also works for configMapRef    #though the env variable names will then be the same as in the Secret
        name: secret1

-  k -n moon exec secret-handler -- env | grep SECRET1
-  k -n moon exec secret-handler -- find /tmp/secret2
-  kubectl exec secret-volume-pod -n hard-exam -- ls /etc/secrets



# Misc
kubectl create quota myrq --hard=cpu=1,memory=1G,pods=2 --dry-run=client -o yaml
kubectl create quota my-rq --namespace=one --hard=requests.cpu=1,requests.memory=1Gi,limits.cpu=2,limits.memory=2Gi
kubectl create token myuser
kubectl convert -f deprecated.yaml --output-version=<new_version>





# HELM
helm list

helm install <release-name> <chart-name> --set replicaCount=<number-of-replicas>
helm install <release-name> <chart-name> --dry-run --debug

helm upgrade <release-name> <chart-name>
helm history <release-name>
helm rollback <release-name> <revision-number>

helm get values <release-name>
helm show values bitnami/apache # will show a long list of all possible value-settings

helm repo list
helm repo add <repo-name> <repo-url>
helm repo update
helm search repo <chart-name>

helm list --pending -A
By default releases in pending-upgrade state aren't listed : -as